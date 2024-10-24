#!/bin/bash

function greet() {
  echo $0 # ./script.sh (name of the script)
  echo $1 # Brad (parameter 1)
  echo Hello $1, I am $2 # Hello Brad, I am 36
  echo ${1} # Brad (positional parameter 1)
  echo $* # Brad 36 (all arguments)
  echo $@ # Brad 36 (all arguments starting from first)
  echo $9 # ""
  echo $# # 2 (number of arguments)
  echo $$ # 98438 (process id of the shell)
  echo $- # hB (current options)
  echo $_ # hB (last argument of the previous command)
}

greet "Brad" "36"