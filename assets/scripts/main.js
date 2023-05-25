import {authorization} from "./modules/authorization.js";
import {account} from "./modules/account.js";
import {set_right_vh} from "./utils/set_right_vh.js";
import {get_cookie} from "./utils/cookie.js";
import {global_state} from "./states/global.js";

const cookie = get_cookie('user_data');

// Устанавливает правильный vh для google mobile
set_right_vh();

if(cookie) global_state.page = 'account';
else global_state.page = 'authorization';

