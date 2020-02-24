var AWS = require('aws-sdk');
// Set the region
AWS.config.update({region: 'eu-west-3'});
console.log("start");
// Create an SQS service object
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

var queueURL = "https://sqs.eu-west-3.amazonaws.com/207917063194/sqs_test";

var params = {
    AttributeNames: [
       "SentTimestamp"
    ],
    MaxNumberOfMessages: 10,
    MessageAttributeNames: [
       "All"
    ],
    QueueUrl: queueURL,
    VisibilityTimeout: 60,
    WaitTimeSeconds: 0
   };
   

   var receiveMessages = function() {
  sqs.receiveMessage(params, function(err, data) {
   
     if (err) {
       console.log("Receive Error", err);
     } else if (data.Messages) {
         console.log(   JSON.parse(data.Messages[0].Body).nom);
       var deleteParams = {
         QueueUrl: queueURL,
         ReceiptHandle: data.Messages[0].ReceiptHandle
       };
       removemessages(deleteParams);
       
      
  
       
     }
     
     setTimeout(() => {
        receiveMessages();
        }, 1000);
        receiveMessages();
   });
}
var removemessages = function(deleteParams){
    sqs.deleteMessage(deleteParams, function(err, data) {
        if (err) {
          console.log("Delete Error", err);
        } else {
          console.log("Message Deleted", data);
        }
      });
}   
receiveMessages();