echo 'ENTER YOUR PHONE STORAGE FOLDER NAME'
# read strgenme

git config --global --add safe.directory $PWD

# git config --global --add safe.directory $pwd

# git config --global --add safe.directory /storage/emulated/0/$strgenme

echo "PLEASE ENTER YOU MAIL ID"
#read mail
echo 'PLEASE ENTER YOU GITHUB USERNAME'
# read usrnme
echo "PLEASE ENTER YOUR GITHUB REPOSITORY NAME"
# read repo
echo 'PLEASE ENTER YOU GITHUB TOEKN'
#read tkn
echo "PLEASE ENTER NAME FOR COMMIT"
 read cmit

echo "PLEASE ENTER NAME FOR BRANCH"
#read brnxh

echo 'PLEASE WAIT FOR FINISH AUTOMATIC PROCESS'

# rm -rf .git
git init
git add .
git config --global user.email "person@lahore.pak"
git config --global user.name "🇵🇰"
git commit -m "$cmit"
git branch -M master
git remote add origin https://github.com/ITS-ME-001/Queen-Anya_Baileys.git
git push -u origin master