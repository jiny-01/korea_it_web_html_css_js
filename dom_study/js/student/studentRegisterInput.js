//4. student register input 함수
function studentRegisterInput({ type, name, onkeyup}) {
    return `
    <div>
        <input type='${type}' name'${name}' autocomplete="off" onkeyup='${onkeyup}(event)'
    </div>
    `
}