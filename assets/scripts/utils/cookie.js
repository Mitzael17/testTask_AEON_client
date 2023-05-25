export function set_cookie(name, value, options = {}) {

    options.path = options.path ?? '/';

    let updated_cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (const option_key in options) {

        updated_cookie += "; " + option_key;

        const option_value = options[option_key];

        if (option_value !== true) updated_cookie += "=" + option_value;

    }

    document.cookie = updated_cookie;

}

export function get_cookie(name) {

    const matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));

    return matches ? decodeURIComponent(matches[1]) : undefined;

}

export function delete_cookie(name) {

    set_cookie(name, "", {
        'max-age': -1
    })

}