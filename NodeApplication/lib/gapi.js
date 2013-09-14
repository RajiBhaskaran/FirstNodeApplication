var googleapis = require('googleapis'),
GoogleSpreadsheet = require("google-spreadsheet"),
OAuth2Client = googleapis.OAuth2Client,
scopes = 'https://spreadsheets.google.com/feeds https://docs.google.com/feeds',
client = '957346164111.apps.googleusercontent.com',
secret = 'PCwbyzBZrH4O-tVR8sMq2ib9',
redirect = 'http://localhost:8080/oauth2callback',
oauth2Client = new OAuth2Client(client, secret, redirect);

auth_url = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes
});

function spreadsheets(accesstoken){
this.spreadsheet=new GoogleSpreadsheet('0AqYOAHSh7GjddGhCTEpPTVBLZjdVOWFhdEhUWlYyTUE',accesstoken);
}
spreadsheets.prototype.searchByColumn=function(column){
	var results=[];
	this.spreadsheet.getInfo( function(err, ss_info){
	if (err) console.log( err );
	console.log(ss_info);
	if(ss_info.worksheets){
	ss_info.worksheets[0].getRows( function(err, rows){
		rows.forEach(function(row){
		results.push(row[column]);
		})
		console.log("Search results by name:"+results);
		
	});
	}
});
}
spreadsheets.prototype.addRow=function(data,cb){
this.spreadsheet.addRow('od6',data,function(){
console.log('After row addition:Row added');
cb('success');
});
}
exports.url=auth_url;
exports.client = oauth2Client;
exports.spreadsheets=spreadsheets;
