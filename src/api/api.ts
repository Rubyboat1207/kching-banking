const API_BASE_URL = 'https://titanschedule.com:5000';

function apiFetch(path: string, group_name: string | null, password: string | null, extra_body: any={}) {
    return fetch(API_BASE_URL + path, {
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
    const json = await apiFetch('/group/login', window.sessionStorage.getItem('group_name'), window.sessionStorage.getItem('password')).then(res => res.json().then(json => {
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

export async function sendMoney(recipient: string, transfer_amount: number): Promise<boolean> {
    const json = await apiFetch('/group/transfer', window.sessionStorage.getItem('group_name'), window.sessionStorage.getItem('password'), {
        to_group_name: recipient,
        transfer_amount
    }).then(res => res.json().then(json => {
        return json;
    }))

    if(!json.success) {
        alert(json.message);
    }

    return json.success;
}