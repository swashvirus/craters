for i in ./app/craters/*.js; do
    [ -f "$i" ] || break
    js-beautify "$i" >tmp && mv tmp "$i"
done
for i in *.html; do
    [ -f "$i" ] || break
    echo "$i"
done
for i in *.css; do
    [ -f "$i" ] || break
    echo "$i"
done