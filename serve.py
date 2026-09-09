import http.server, os
os.chdir('/Users/KMS_MISO/Downloads/kbz_3.0_ui_stytem')
http.server.test(HandlerClass=http.server.SimpleHTTPRequestHandler, port=7890, bind='127.0.0.1')
