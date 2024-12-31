from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import tensorflow as tf
import numpy as np
import os
import json
import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/')
def home():
    return 'Hello, World!'

# Directories and file paths
RECEIVED_MODELS_DIR = "./received_models"
GLOBAL_MODEL_PATH = "./global_model.tflite"
LOG_FILE = "./update_logs.json"

# Ensure necessary directories exist
os.makedirs(RECEIVED_MODELS_DIR, exist_ok=True)

# Initialize log file if it doesn't exist
if not os.path.exists(LOG_FILE):
    with open(LOG_FILE, "w") as f:
        json.dump([], f)

# Initialize the global model if it doesn't exist
def initialize_global_model():
    """Creates and saves an initial global model if none exists."""
    model = tf.keras.Sequential([
        tf.keras.layers.Input(shape=(3,)),
        tf.keras.layers.Dense(128, activation='relu'),
        tf.keras.layers.Dense(1, activation='sigmoid')
    ])
    model.save("global_model.h5")
    converter = tf.lite.TFLiteConverter.from_keras_model(model)
    tflite_model = converter.convert()
    with open(GLOBAL_MODEL_PATH, "wb") as f:
        f.write(tflite_model)

if not os.path.exists(GLOBAL_MODEL_PATH):
    initialize_global_model()


# Function to load TFLite model weights
def load_tflite_weights(tflite_model_path):
    try:
        interpreter = tf.lite.Interpreter(model_path=tflite_model_path)
        interpreter.allocate_tensors()

        tensor_details = interpreter.get_tensor_details()

        weights = []
        for tensor in tensor_details:
            try:
                tensor_data = interpreter.get_tensor(tensor['index'])
                weights.append(tensor_data)
            except ValueError:
                print(f"Tensor {tensor['index']} contains no data")
                return None

        return weights
    except Exception as e:
        print(f"Failed to load TFLite model {tflite_model_path}: {str(e)}")
        return None


# Federated Averaging
def federated_averaging(weight_sets):
    """Performs federated averaging of weights."""
    return [np.mean(np.stack(weights), axis=0) for weights in zip(*weight_sets)]


# Logging function
def log_update(update_info):
    """Logs updates for received or aggregated models."""
    with open(LOG_FILE, "r") as f:
        logs = json.load(f)
    logs.append(update_info)
    with open(LOG_FILE, "w") as f:
        json.dump(logs, f, indent=4)


# Test connection endpoint
@app.route('/test_connection', methods=['GET'])
def test_connection():
    return jsonify({"status": "success", "message": "Connected to Flask server!"}), 200


# Endpoint: Upload local model updates
@app.route('/upload', methods=['POST'])
def upload_model():
    """Accepts TFLite files from local devices."""
    if 'file' not in request.files or 'client_id' not in request.form:
        return jsonify({"message": "Missing 'file' or 'client_id' in request."}), 400

    file = request.files['file']
    client_id = request.form['client_id']

    filename = f"{client_id}_model.tflite"
    file_path = os.path.join(RECEIVED_MODELS_DIR, filename)
    file.save(file_path)

    log_update({
        "client_id": client_id,
        "file_path": file_path,
        "timestamp": datetime.datetime.now().isoformat()
    })

    return jsonify({"message": "Model update received successfully!"}), 200


# Endpoint: Aggregate updates and update global model
@app.route('/aggregate', methods=['POST'])
def aggregate_updates():
    model_files = [os.path.join(RECEIVED_MODELS_DIR, file) for file in os.listdir(RECEIVED_MODELS_DIR) if file.endswith('.tflite')]

    if len(model_files) == 0:
        return jsonify({"message": "No updates available for aggregation!"}), 400

    all_weights = []
    for file in model_files:
        weights = load_tflite_weights(file)
        if weights:
            all_weights.append(weights)
        else:
            print(f"Failed to load weights from {file}")

    if len(all_weights) == 0:
        return jsonify({"message": "No valid updates available for aggregation!"}), 400

    aggregated_weights = federated_averaging(all_weights)

    global_model = tf.keras.Sequential([
        tf.keras.layers.Input(shape=(3,)),
        tf.keras.layers.Dense(128, activation='relu'),
        tf.keras.layers.Dense(1, activation='sigmoid')
    ])

    global_model.set_weights(aggregated_weights)
    global_model.save("global_model.h5")

    converter = tf.lite.TFLiteConverter.from_keras_model(global_model)
    tflite_model = converter.convert()
    with open(GLOBAL_MODEL_PATH, "wb") as f:
        f.write(tflite_model)

    log_update({
        "event": "aggregation",
        "model_files": model_files,
        "global_model_path": GLOBAL_MODEL_PATH,
        "timestamp": datetime.datetime.now().isoformat()
    })

    return jsonify({"message": "Global model updated successfully!"}), 200


# Endpoint: Download global model
@app.route('/download', methods=['GET'])
def download_global_model():
    try:
        return send_file(GLOBAL_MODEL_PATH, as_attachment=True)
    except FileNotFoundError:
        return jsonify({"message": "Global model not found!"}), 404


# Endpoint: Get logs
@app.route('/logs', methods=['GET'])
def get_logs():
    with open(LOG_FILE, "r") as f:
        logs = json.load(f)
    return jsonify(logs)


# Endpoint: Get model metadata
@app.route('/model_metadata', methods=['GET'])
def model_metadata():
    if not os.path.exists(GLOBAL_MODEL_PATH):
        return jsonify({"message": "Global model not found!"}), 404

    model_size = os.path.getsize(GLOBAL_MODEL_PATH) / (1024 * 1024)  # Size in MB
    last_updated = os.path.getmtime(GLOBAL_MODEL_PATH)

    last_updated_readable = datetime.datetime.fromtimestamp(last_updated).strftime('%Y-%m-%d %H:%M:%S')

    with open(LOG_FILE, "r") as f:
        logs = json.load(f)
    updates_received = len([log for log in logs if log.get('client_id')])

    metadata = {
        "last_updated": last_updated_readable,
        "model_size_MB": round(model_size, 2),
        "updates_received": updates_received
    }

    return jsonify(metadata)

# List of registered devices
DEVICE_ENDPOINTS = [
    "http://localhost:5001/update_model", 
    "http://localhost:5002/update_model"
]

# Endpoint: Send updated global model to devices
@app.route('/send_updates', methods=['POST'])
def send_updates():
    if not os.path.exists(GLOBAL_MODEL_PATH):
        return jsonify({"message": "Global model not found!"}), 404

    results = {}
    for endpoint in DEVICE_ENDPOINTS:
        try:
            with open(GLOBAL_MODEL_PATH, "rb") as f:
                files = {'file': ("global_model.tflite", f, "application/octet-stream")}
                response = requests.post(endpoint, files=files)
                results[endpoint] = response.json()
        except Exception as e:
            results[endpoint] = {"error": str(e)}

    log_update({
        "event": "send_updates",
        "device_results": results,
        "timestamp": datetime.datetime.now().isoformat()
    })

    return jsonify({"message": "Global model sent to devices!", "results": results}), 200



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
