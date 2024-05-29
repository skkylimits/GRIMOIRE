import socket
import time


def udp_ping(target_host, target_port, timeout=1):
    """
    Sends a UDP ping to the target host and port.

    :param target_host: The IP address or hostname of the target.
    :param target_port: The UDP port to send the ping to.
    :param timeout: The maximum time (in seconds) to wait for a response.
    :return: Round-trip time if the ping is successful, None otherwise.
    """
    try:
        # Create a UDP socket
        client_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        client_socket.settimeout(timeout)

        # Initialize sequence number
        sequence_number = 1

        # Loop to send pings at least 10 times
        for _ in range(10): # The underscore _ It's a convention that indicates to the interpreter that the result is not intended to be used or stored.

            # Create a message with sequence number
            message = f'Ping {sequence_number}'.encode()
            start_time = time.time()

            # Send the UDP packet with our message to the target.
            client_socket.sendto(message, (target_host, target_port))

            try:
                # Wait for the response from the target
                response, address = client_socket.recvfrom(1024) # If you only use one variable to capture the result of recvfrom, you would get a tuple containing both the data and the sender's address.
                end_time = time.time()

                #  Calculate and print the round trip time (RTT), in seconds, of each packet, if server responses
                round_trip_time = end_time - start_time
                
                # Print a response message from the server
                print(f"Received response: {address} {response.decode()}")
                print(f"Round-trip time: {round_trip_time:.6f} seconds")
            except socket.timeout:
                # otherwise, print “Request timed out”
                print(f"Request {sequence_number} timed out")
            finally:
                sequence_number += 1

        return round_trip_time
    except Exception as e:
        print(f"An error occurred: {e}")
        return None
    finally:
        client_socket.close()

if __name__ == "__main__":
    target_host = "127.0.0.1"  # Replace with the target IP address
    target_port = 12000        # Replace with the target port number

    print(f"Pinging {target_host}:{target_port} with UDP packets...")
    udp_ping(target_host, target_port)


# TODO Optional Exercises
# 1. Currently, the program calculates the round-trip time for each packet and prints it out individually.
# Modify this to correspond to the way the standard ping program works. You will need to report the
# minimum, maximum, and average RTTs at the end of all pings from the client. In addition, calculate
# the packet loss rate (in percentage).
# 2. Another similar application to the UDP Ping would be the UDP Heartbeat. The Heartbeat can be
# used to check if an application is up and running and to report one-way packet loss. The client sends
# a sequence number and current timestamp in the UDP packet to the server, which is listening for
# the Heartbeat (i.e., the UDP packets) of the client. Upon receiving the packets, the server calculates
# the time difference and reports any lost packets. If the Heartbeat packets are missing for some
# specified period of time, we can assume that the client application has stopped.
# Implement the UDP Heartbeat (both client and server). You will need to modify the given
# UDPPingerServer.py, and your UDP ping client.