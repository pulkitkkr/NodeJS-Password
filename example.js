var argv = require('yargs')
	.command('add','Add an account to account list', function(yargs){
		yargs.options({
			Name : {
				demand :true
			},
			Email : {
				demand :true
			},
			Password:{
				demand :true
			}
		});
	})
	.command('search','Search Particular user by Name',function(yargs){
		yargs.options({
			key :{
				demand: true
			}
		});
	})
	.command('showAll','Shows All UserAccounts',null)
	.command('remove','Remove User',function(yargs){
		yargs.options({
			Name :{
				demand: true
			}
		});
	})
	.argv;
var storage = require('node-persist');
storage.initSync();

var command = argv._[0];
if(command==='add')
{
	if(typeof argv.Name !== 'undefined' && typeof argv.Email !=='undefined' && typeof argv.Password !== 'undefined')
	{
		var UserDetail = {
		Name : argv.Name,
		Email : argv.Email,
		Password : argv.Password
		};
		if(storage.getItemSync('Accounts'))
		{
			var Accounts = storage.getItemSync('Accounts');
			Accounts.push(UserDetail);
			storage.setItemSync('Accounts',Accounts);
		}
		else
		{
			storage.setItemSync('Accounts',[]);
			var Accounts = storage.getItemSync('Accounts');
			Accounts.push(UserDetail);
			storage.setItemSync('Accounts',Accounts);
		}
		console.log('Successfully Added Account to Accounts');
		
	}
	else
	{
		console.log("Error: Addition Requires Three Parameters 'Name','Email' and 'Password'");
	}
	
}
else if(command=='showAll')
{
	var Accounts = storage.getItemSync('Accounts');
	if(Accounts !== 'undefined')
	{
		Accounts.forEach(function(UserAccount){
			console.log(UserAccount.Name+'\t'+UserAccount.Email+'\t'+UserAccount.Password);
		});
	}
	else
	{
		console.log('Datase is Empty');
	}
}
else if(command == 'search')
{
	var searchKey= argv.key;
	var found = false;
	if(typeof searchKey !== 'undefined' && searchKey!== '')
	{
		storage.getItemSync('Accounts').forEach(function(UserDetail){
			if(searchKey.toLowerCase() ===UserDetail.Name.toLowerCase())
			{
				console.log(UserDetail.Name+'\t'+UserDetail.Email+'\t'+UserDetail.Password);
				found = true;
			}
		});
		if(!found)
		{
			console.log('No search result Found');
		}
	}
	else
	{
		console.log("Please Enter a Valid search Key")
	}
}
else if(command==='remove')
{
		var UsesrToBeDeleted=argv.Name;
		if(typeof UsesrToBeDeleted !== 'undefined' )
		{
			var Accounts = storage.getItemSync('Accounts');
			Accounts.forEach(function(currentAccount){
				if(currentAccount===UsesrToBeDeleted)
				{
					
				}
			});
		}
}
else
{
	console.log('invalid Command');
}
