#Build reactjs app
npm run build

#Move to build folder
cd build

#Clone index.html into 200.html
cp index.html 200.html

#Strart deploying via Surge
surge . moviebooking.surge.sh