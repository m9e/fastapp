import socket
import sys
from typing import List

def check_port_availability(ports: List[int]) -> None:
    """
    Check if the given ports are available.

    Args:
        ports (List[int]): List of port numbers to check.

    Raises:
        SystemExit: If any port is occupied.
    """
    for port in ports:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            try:
                s.bind(("", port))
            except socket.error as e:
                print(f"Port {port} is occupied. Please choose another port.")
                raise SystemExit(e)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python test-ports.py <port1> <port2> ... <portN>")
        sys.exit(1)

    try:
        ports_to_check = [int(port) for port in sys.argv[1:]]
    except ValueError as e:
        print("Please provide valid port numbers.")
        sys.exit(1)

    check_port_availability(ports_to_check)
    print("All specified ports are available.")
