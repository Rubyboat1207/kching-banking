import { useEffect, useState } from "react";
import { getGroupInfo, sendMoney } from "../api/api";
import moment from 'moment-timezone'

function isNumber(numStr: string) {
    return !isNaN(parseFloat(numStr)) && !isNaN(+numStr)
}

function Account() {
    const [tableData, setTableData] = useState<any[]>([])
    const [balance, setBalance] = useState<string | null>(null)
    const [processing, setProcessing] = useState(false)

    const [recipient, setRecipient] = useState('')
    const [amount, setAmount] = useState('')

    useEffect(resetData, [])

    function resetData() {
        getGroupInfo().then(data => {
            setTableData(data.records)
            setBalance('$' + data.account_balance);
            setProcessing(false)
        })
    }

    function beginTransfer() {
        setProcessing(true);
        if(!isNumber(amount)) {
            alert('amount must be a number.');
            setProcessing(false);
            return;
        }

        if(confirm(`Do you want to transfer \$${amount} to ${recipient}? This confirmation will only appear once.`)) {
            sendMoney(recipient, parseInt(amount)).then(resetData)
        }
    }

    return (
        <>
            <div>
                <h1 id="acct_name">{window.sessionStorage.getItem('group_name')}</h1>
            </div>
            <div>
                <h2 id="balance">Your Current balance is: {balance || 'loading'} </h2>
            </div>
            <div>
                <label htmlFor="group_send">Recipient Entity</label>
                <div>
                    <input type="text" name="group_send" placeholder="group 1" onChange={e => setRecipient(e.target.value)} value={recipient}/>
                </div>
            </div>
            <div>
                <label htmlFor="amount">Amount Sending</label>
                <div>
                    <input type="amount" name="amount" placeholder="$500" onChange={e => setAmount(e.target.value)} value={amount}/>
                </div>
            </div>
            <button onClick={beginTransfer} disabled={processing}>Transfer Money</button>
            <div>
                <table id="table">
                    <tr>
                        <th>Action</th>
                        <th>Difference</th>
                        <th>Intial Balance</th>
                        <th>Timestamp</th>
                    </tr>
                    {tableData.map(d => (
                        <tr>
                            <td>{d.action}</td>
                            <td>{d.difference}</td>
                            <td>{d.initial_balance}</td>
                            <td className="timestamp">{moment(parseInt(d.timestamp) * 1000).format('DD/MM/YYYY hh:mm:ss a')}</td>
                        </tr>
                    ))}
                </table>
            </div>
        </>
    )
}

export default Account;