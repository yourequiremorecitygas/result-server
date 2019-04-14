import socket
import sys

#Result-Server to Process Server Request
HOST = '52.194.252.52' #Address of Process Server
PORT = 8080

def getFileFromProcessServer(filename):
    data_transferred = 0

    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.connect((HOST, PORT))
        sock.sendall(filename.encode())

        data = sock.recv(1024)
        if not data:
            print('File[%s] is NOT in server directory' %filename)
            return
        
        with open('./' + filename, 'wb') as f:
            try:
                while data:
                    f.write(data)
                    data_transferred += len(data)
                    data = sock.recv(1024)
            except Exception as e:
                print(e)
        
        print('File[%s] Complete... Filesize [%d]' %(filename, data_transferred))

'''
filename = sys.argv[1]
getFileFromProcessServer(filename)
'''
