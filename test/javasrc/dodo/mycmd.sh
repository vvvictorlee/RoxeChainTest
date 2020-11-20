case "$1" in
"c") javac TestApiDemo.java ;;
"e") java TestApiDemo   ;;
*) echo "c --compile e --execute" ;;
esac
  

