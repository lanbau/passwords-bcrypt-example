curl -i -H "Content-Type: application/json" -d '{
  "user": {
    "name": "hakim",
    "email": "hakim@alex.com",
    "password": "password"
  }
}' http://localhost:3000/signup


curl -i -H "Content-Type: application/json" -d '{
  "user": {
    "email": "hakim@alex.com",
    "password": "password"
  }
}' http://localhost:3000/signin
