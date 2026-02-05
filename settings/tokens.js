//for tranq goto https://developers.eveonline.com/applications
//for sisi goto https://developers.testeveonline.com/applications
//register an app to get client_id, client_secret, callback_URL and scopes
//the scopes you need are listed below, for tranq and sisi:


//IMPORTANT: CCP stopped supporting SISI esi tokens, so using SISI server for map debugging has no sense
const esi_scopes = 'esi-location.read_ship_type.v1'+
			// '%20esi-ui.write_waypoint.v1'+			 
			// '%20publicData'; 
			// '%20characterLocationRead'+ 
			// '%20characterNavigationWrite'+ 
			// '%20characterBookmarksRead'+ 
			// '%20corporationBookmarksRead'+ 
			// '%20esi-assets.read_assets.v1'+ 
			// '%20esi-skills.read_skills.v1'+ 
			// '%20esi-skills.read_skillqueue.v1'+ 
			// '%20esi-bookmarks.read_character_bookmarks.v1'+ 
			'%20esi-killmails.read_killmails.v1'+
			'%20esi-fleets.read_fleet.v1'+
			'%20esi-fleets.write_fleet.v1'+
			// '%20esi-ui.open_window.v1'+ 
			// '%20esi-ui.write_waypoint.v1'; 
			// '%20esi-fittings.read_fittings.v1'+  
			// '%20esi-characters.read_loyalty.v1'+ 
			'%20esi-location.read_online.v1'+
			'%20esi-location.read_location.v1';
			