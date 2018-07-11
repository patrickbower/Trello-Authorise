#!/bin/bash

# run project server
$(
  grunt &&
  cd build &&
  php -S 0.0.0.0:1234
) &

# tell the people what they want to hear
echo "---------------------"
echo ""
echo "Server is running on http://localhost:1234"
echo ""
echo "---------------------"
echo ""
echo "Grunt watch is running:"
echo ""
grunt watch
