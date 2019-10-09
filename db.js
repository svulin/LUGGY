//places 
{
	_id:1,
	name: 'copany1',
	email: 'company1@complany1.ru',
	price: 200
	password: '****'
	coordinates:{
		latitude: 37,
		longitude:55
	},
	working_hours:{
		start: 09:00,
		end: 21:00
	},
	user:[{
		_id: 1,
		start: 21.04.2019,
		end: 21.04.2019
	}]	
}

//users
{
	_id: 1,
	email: 'rmn@gmail.com',
	password: '****',
	isVerified: true,
	places: [{
		_id:1
		start: 21.04.2019,
		end: 21.04.2019
	}]
}

//bookings (DONTNEED)
{
	users._id: 1,
	palces._id: 1,
	booking:{
		start: 21.04.2109,
		end: 21.04.2109
	}
}