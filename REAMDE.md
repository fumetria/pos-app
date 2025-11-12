# Basic POS APP

This project is a basic POS application with a frontend as interface where we can add products and send to print to our thermal printer and open cash drawer using a local nodeJS server as backend.

## Features

- Add products to the articles list.
- Modify prices, add details or observations and delete products from the articles list table.
- Print tickets from our thermal printer.
- Open our cash drawer to charge the customer.

## Technologies used

### Frontend

The interface we use is built with REACT and TAILWIND CSS.

### Printer server (Backend)

The server allows us to work with POS equipment, such as thermal printers and cash drawers, through a simple HTTP interface.

We can work from a frontend cloud application and communicate with our local POS equipment via this server. In our case, we are using a EPSON TM-T20II printer with a virtual COM port assigned with EPSON TM Virtual Port Driver Port application from EPSON.

### Dependencies

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [node-thermal-printer](https://www.npmjs.com/package/node-thermal-printer): A package where we can config the format of our tickets and send to print to our thermal printer. In theory we can send to print and the printer print our ticket, in our case this function don't work.
- [serialport](https://www.npmjs.com/package/serialport): This package allow us to connect with the differents ports of our computer. In our case, we are going to use to send the data from the package node-thermal-printer to our thermal printer.

## Installation

```bash
cd backend
cp .env.example .env
npm install
npm start
```

This will start the printer server. Then we can run the interface:

```bash
cd frontend
npm install
npm run dev || npm run build
```

### Observations

- If we change the printer-server port, we have to change the url in the frontend.
