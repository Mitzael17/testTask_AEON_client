export function default_validation(input_name, input_password, form_states) {

    if(input_name.value.length === 0 || input_password.value.length === 0) {

        form_states.error = 'Заполните форму!';

        return false;

    }

    if(input_name.value.length > 100) {

        form_states.error = 'Логин слишком длинный!';

        return false;

    }

    if(input_password.value.length > 255) {

        form_states.error = 'Пароль слишком длинный!';

        return false;

    }

    return true;

}