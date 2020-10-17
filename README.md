# e-commerce-cms

Membuat dashboard untuk admin dalam me-manage content e-commerce

1. Create server folder
2. npm init on server folder
3. Install jest, add script test in package.json
   "scripts": {
   "test": " jest"
   },
4. Create script test, run => fail
5. Create function to make code work => passedTesting Endpoint
   pakai SuperTest
6. Install supertest in server dev dependencies
7. Buat script test
8. Bikin routing
9. Buatlah database test
   sequelize db:create --env=test
   sequelize db:migrate --env=testNotes

- di dalam describe bisa ada banyak test(it)
- it itu adalah alias dari test
- method di test => .post, .get, .put, .patch, dsb
- send => req.body
- set => re.headers
- kalau ga exit setelah test kelar tambahkan opsi forceexit
  "test": " jest --runInBand --verbose --detectOpenHandles --forceExit"--runInBand => run test serially
  --detectOpenHandles => detect open handles , tracking open handles , app.listen
  --forceExit => force jest exit setelah test kelar
  --verbose false => display console.log- kalau kena timeout, jangan lupa di done()
