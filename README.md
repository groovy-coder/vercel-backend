it's toned down version of Vercel's backend system. the user can upoload their github or other files with the program.
the program essentialy stores the files and folders in an Object store(S3) from the Amazon(aws-sdk). 
the upload-service push-es the files given to a Redis-based-queue .
the deploy-service retrieves the folders using (FIFO) and broken up into individual files using the servers-side OS .
an id is assigned to it .finally it is pushed to S3.
the request-handler manages the requests it gets and enables tracking of the changes made to the uploaded files.
consider-Nodejs type files cannot be operated upon.it requires a few modification. 
