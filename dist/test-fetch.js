import fetch from 'node-fetch';
async function test() {
    try {
        const res = await fetch('https://red-bud.ru/api/categories');
        console.log('Status:', res.status);
        const json = await res.json();
        console.log('Data:', json);
    }
    catch (err) {
        console.error('Fetch error:', err);
    }
}
test();
