using extension edgeql_http;
using extension graphql;
module default {
	type Bikes
	{
		property currency -> str;
		property price -> decimal;
		property frame -> str;
		property wheels -> str;
		property travelfront -> str;
		property travelrear -> str;
		property fork -> str;
		property groupset -> str;
		property suspension -> str;
		property motor -> str;
		property battery -> str;
		property drivetrain -> str;
		property brakes -> str;
		property url -> str{	
			constraint exclusive
		};	
	}
	type Models
	{
		property model -> str;
		property year -> str;

		constraint exclusive on ((.model, .year));

		multi link bikes -> Bikes;
  		
	}
	type Subcategories
	{
		property subcategory -> str{
    			constraint exclusive;
  		};
		multi link models -> Models;
	}
	type Categories
	{
		property category -> str{
    			constraint exclusive;
  		};
		multi link subcategories -> Subcategories;
		multi link models -> Models;
	}
	type Brands{
		property brand -> str{
    			constraint exclusive;
  		};
		multi link categories -> Categories;
		multi link models -> Models;
	}
}
