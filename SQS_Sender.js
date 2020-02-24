var AWS = require('aws-sdk');
// Set the region
AWS.config.update({region: 'eu-west-3'});
console.log("start");
// Create an SQS service object
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

var queueURL = "https://sqs.eu-west-3.amazonaws.com/207917063194/sqs_test";

var params = {
  DelaySeconds: 0,
  MessageAttributes: {
    "Title": {
      DataType: "String",
      StringValue: "The Whistler"
    },
    "Author": {
      DataType: "String",
      StringValue: "John Grisham"
    },
    "WeeksOn": {
      DataType: "Number",
      StringValue: "6"
    }
  },
  MessageBody: "Information about current NY Times fiction bestseller for week of 12/11/2016.",
  // MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
  // MessageId: "Group1",  // Required for FIFO queues
  QueueUrl: queueURL
};
   
var i = 0;
   var sendMessage = function(){
    params.MessageBody = JSON.stringify( {"nom":"Message numéro " + i++, "prenom":"Jones"})
    
    sqs.sendMessage(params, function(err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data.MessageId);
      }
    });
    setTimeout(() => {
      sendMessage();
        }, 100);
   }
     

          
   sendMessage();

 