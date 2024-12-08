import tensorflow as tf

# Path to the TFLite model
model_path = "./malware_detection_model.tflite"


try:
    interpreter = tf.lite.Interpreter(model_path=model_path)
    interpreter.allocate_tensors()

    input_details = interpreter.get_input_details()
    output_details = interpreter.get_output_details()

    print(f"Input Details: {input_details}")
    print(f"Output Details: {output_details}")
    print("Successfully loaded tensors from the model.")

except Exception as e:
    print(f"Failed to load model {model_path}: {e}")

import socket

host_name = socket.gethostname()
ip_address = socket.gethostbyname(host_name)
print(f"Your IP address is: {ip_address}")
