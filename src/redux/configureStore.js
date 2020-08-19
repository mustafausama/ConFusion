import { createStore, combineReducers } from 'redux';
import { Dishes } from './dishes';
import { Comments } from './comments';
import { Leaders } from './leaders';
import { Promotions } from './promotions';

export const ConfigureStore = () => {
	const store = createStore(
		combineReducers({
			dishes: Dishes,
			comments: Comments,
			leaders: Leaders,
			promotions: Promotions
		}),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	);
	return store;
};
