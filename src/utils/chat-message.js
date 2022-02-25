import moment from 'moment'

export function format(username, text) {
    return {
        username,
        text,
        time: moment().format('hh:mm')
    }
}