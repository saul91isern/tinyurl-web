#!/bin/sh

echo "----- Install serve -----"

yarn global add serve

echo "----- Run build -----"

serve -s -n build
