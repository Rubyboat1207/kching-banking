const API_BASE_URL = 'https://titanschedule.com:5000';
const LOCAL_API_URL = 'http://localhost:5001';
const useLocal = false;

function getURL() {
    return useLocal ? LOCAL_API_URL : API_BASE_URL;
}

function apiFetch(path: string, group_name: string | null, password: string | null, extra_body: any={}) {
    return fetch(getURL() + path, {
        method: 'POST',
        body: JSON.stringify(Object.assign({
            group_name,
            password
        }, extra_body)),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}


export async function getGroupInfo() {
    const json = await apiFetch('/group/login', window.localStorage.getItem('group_name'), window.localStorage.getItem('password')).then(res => res.json().then(json => {
        return json;
    }))

    if(json.success) {
        return json.data;
    }

    alert(json.message);
}

export async function tryLogin(group_name:string, password: string): Promise<boolean> {
    const json = await apiFetch('/group/checkpass', group_name, password).then(res => res.json().then(json => {
        return json;
    }))

    if(!json.success) {
        alert(json.message);
    }

    return json.success;
}

export async function sendMoney(recipient: string, transfer_amount: number, custom_message: string='', useBal: boolean=true): Promise<boolean> {
    const json = await apiFetch('/group/transfer', window.localStorage.getItem('group_name'), window.localStorage.getItem('password'), {
        to_group_name: recipient,
        transfer_amount,
        message: custom_message,
        reduce_capital: useBal
    }).then(res => res.json().then(json => {
        return json;
    }))

    if(!json.success) {
        alert(json.message);
    }

    return json.success;
}

export async function requestBox(boxes_amount: number, booth_number: string) {
    const json = await apiFetch('/services/requestBox', window.localStorage.getItem('group_name'), window.localStorage.getItem('password'), {
        boxes_amount,
        booth_number
    }).then(res => res.json().then(json => {
        return json;
    }))

    if(!json.success) {
        alert(json.message);
    }

    return json.success;
}