#!/bin/bash

# File containing the list of proxies (one per line)
PROXY_LIST="proxies.txt"

# Function to test a single proxy
test_proxy() {
    local proxy=$1
    echo "Testing proxy: $proxy"
    
    # Use curl to test the proxy
    response=$(curl -s -x http://$proxy https://ipinfo.io --max-time 10)
    
    if [[ -z "$response" ]]; then
        echo "Proxy $proxy failed or timed out."
    else
        echo "Proxy $proxy succeeded. IP returned: $response"
    fi
    echo "--------------------------------"
}

# Check if the proxy list file exists
if [[ ! -f "$PROXY_LIST" ]]; then
    echo "Error: Proxy list file '$PROXY_LIST' not found."
    exit 1
fi

# Read and test each proxy from the list
while read -r proxy; do
    [[ -z "$proxy" ]] && continue  # Skip empty lines
    test_proxy "$proxy"
done < "$PROXY_LIST"
