/*------------------------------------------------------*/
/**
 * @name User
 * @memberof QuizApp
 * @description
 */
/*------------------------------------------------------*/
class User {
    /**
     * 
     * @param {String} username 
     * @property {} data_storage
     * @property {} user_data
     */
    constructor(username){
        /**
         * @name username
         * @type {String}
         * @description
         */
        this.username = username;
        /**
         * @name data_storage
         * @type {Object}
         * @description 
         */
        this.data_storage = JSON.parse(localStorage.getItem(username));
        /**
         * @name user_data
         * @type {Array}
         * @description
         */
        this.user_data = this.parseStorageData();
        /**
         * @implementation
         */
        this.buildUserData();
    }
    /*------------------------------------------------------*/
    /**
     * @name parseStorageData
     * @type {Method}
     * @description
     */
    /*------------------------------------------------------*/
    parseStorageData(){
        let result_arr  = [];
        let temp_arr    = this.data_storage.quizzes;
        let categories  = ['science', 'technology', 'history', 'geography'];
        // loop categories
        for(let i = 0; i < categories.length; i++){
            // define data object
            let data_display = {
                last_played: null,
                score_percentage: null,
                score_fraction: null,
                category: null,
                times_played: null,
                style_var: null,
                style_var_value: null
            };
            // define category
            let category = categories[i];
            // define initial object properties
            data_display.category   = category;
            data_display.style_var  = `--chart-position--${category}`;
            // define temp properties
            let scores          = 0;
            let max_scores      = 0;
            let timestamps      = [];
            // loop storage entries
            temp_arr.forEach(item => {
                if(item.category == category){
                    scores      += item.score;
                    max_scores  += item.max_score;
                    timestamps.push(item.timestamp);
                }
            });
            // calculate and define final object properties
            if(timestamps.length > 0){
                data_display.score_percentage   = parseFloat((scores / max_scores).toFixed(2));
                data_display.score_fraction     = `${scores} / ${max_scores}`;
                data_display.last_played        = Math.max.apply(null, timestamps);
                data_display.times_played       = timestamps.length;
            }
            // push object to temp_arr
            result_arr.push(data_display);
        }
        // return array
        return result_arr;
    }
    /*------------------------------------------------------*/
    /**
     * @name buildUserData
     * @type {Method}
     * @description
     */
    /*------------------------------------------------------*/
    buildUserData(){
        /**
         * @name container
         * @type {HTMLElement}
         * @description 
         */
        let container = document.getElementById('info--container');
        console.log(container);
        /**
         * @name
         * @type {Function}
         * @description
         */
        function formatTimestamp(timestamp){
            // check if exists
            if(timestamp != null){
                let date_data   = new Date(timestamp).getDate();
                let date_now    = new Date().getDate();
                // select output format
                if(date_data == date_now){
                    return new Date(timestamp).toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: true});
                } else {
                    return new Date(timestamp).toLocaleDateString();
                }
            } else {return '';}
        }
        /**
         * @name createCell
         * @type {Function}
         * @description
         * @param {'category' | 'played' | 'replay' | 'score'} position
         * @param {String | Number} content
         */
        function createCell(position, content){
            /**
             * @name cell_type
             * @type {Object}
             * @description
             */
            let cell_type = {
                category: {
                    class_cell: '__info--row__cell--category',
                    icons: {
                        geography: 'fa-solid fa-globe',
                        science: 'fa-solid fa-atom',
                        technology: 'fa-solid fa-microchip',
                        history: 'fa-solid fa-scroll'
                    },
                    text: false
                },
                played: {
                    class_cell: '__info--row__cell--center',
                    class_icon: 'fa-regular fa-clock',
                    text: true
                },
                replay: {
                    class_cell: '__info--row__cell--center',
                    class_icon: 'fa-regular fa-circle-play',
                    text: true
                },
                score: {
                    class_cell: '__info--row__cell--last',
                    class_icon: 'fa-regular fa-star',
                    text: true
                }
            };
            // create cell
            let cell = document.createElement('div');
            cell.classList.add(cell_type[position].class_cell);
            // create icon: category
            if(cell_type[position].text == false){
                // create container
                let icon_container = document.createElement('div');
                icon_container.classList.add('cell__icon--category');
                // create icon
                let icon_category = document.createElement('i');
                icon_category.setAttribute('class', cell_type[position].icons[content]);
                // append elements
                icon_container.appendChild(icon_category);
                cell.appendChild(icon_container);
            }
            // create icon: NOT category
            else if(cell_type[position].text == true){
                // create icon
                let icon = document.createElement('i');
                icon.setAttribute('class', cell_type[position].class_icon);
                // create small
                let small       = document.createElement('small');
                small.innerHTML = content;
                // append elements
                cell.appendChild(icon);
                cell.appendChild(small);
            }
            // return product
            return cell;
        }
        /**
         * @name createRow
         * @type {Function}
         * @description
         */
        function createRow(){
            let row = document.createElement('article');
            row.classList.add('scoreboard__row');
            return row;
        }
        // loop user data
        this.user_data.forEach(item => {
            // create row
            let row = createRow();
            // create cells
            let category    = createCell('category', item.category);
            let played      = createCell('played', formatTimestamp(item.last_played));
            let replay      = createCell('replay', item.times_played);
            let score       = createCell('score', item.score_fraction);
            // append to row
            row.appendChild(category);
            row.appendChild(played);
            row.appendChild(replay);
            row.appendChild(score);
            // create rows
            container.appendChild(row);
        });
    }
}