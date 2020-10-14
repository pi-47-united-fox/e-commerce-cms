const kali = require('../sum') 

test('one plus two is three',()=>{
  expect(kali(1, 3)).toBe(3);
})

test('testing value oobject', () =>{
  const user = {
    name: "Albar",
    gender: "male"
  }    
  expect(user).toEqual({name: "Albar", gender:"male"})
})

test('is Zero or not', ()=>{
  const zero = 0
  expect(zero).not.toBe(null)
  expect(zero).toBeFalsy()
  expect(zero).not.toBeTruthy()
})

test('grather than number', ()=>{
  const value = 2*5;
  expect(value).toEqual(10)
})

test('kalimat', ()=>{
  const kalimat = 'Indonesia';
  expect(kalimat).toContain('nesia')
  expect('elang').toMatch(/lang/)
})