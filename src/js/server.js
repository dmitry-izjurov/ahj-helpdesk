const http = require('http');
const port = 7071;
const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('@koa/cors');
let idTicket = 0;
const tickets = [];
const ticketsFull = [];

function addId(id) {
  return id + 1;
}

function getDate() {
  let dateTransaction = new Date();
  return `${dateTransaction.toLocaleString()}`;
}

class Ticket {
  constructor(id, name, status, created) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.created = created;
  }
}

class TicketFull extends Ticket {
  constructor(id, name, status, created, description) {
    super(id, name, status, created);
    this.description = description;
  }
}

tickets.push(new Ticket(1, 'Поменять краску в принтере', false, getDate()));
ticketsFull.push(new TicketFull(1, 'Поменять краску в принтере', false, getDate(), 'Поменять краску в принтере'));
tickets.push(new Ticket(2, 'Переустановить Windows', false, getDate()));
ticketsFull.push(new TicketFull(2, 'Переустановить Windows', false, getDate(), 'Переустановить Windows'));
tickets.push(new Ticket(3, 'Установить обновление', true, getDate()));
ticketsFull.push(new TicketFull(3, 'Установить обновление', true, getDate(), 'Установить обновление'));
idTicket = 3;


const app = new Koa();
app.use(cors());

app.use(koaBody({
  urlencoded: true,
  multipart: true
}));

app.use(async (ctx) => { 
  const method  = ctx.request.querystring;
  let id;
  if (method) {
    const num = Number(method.split('id=')[1]);
    if (num) id = num;
  }

  switch (method) {
    case 'method=allTicket':
      ctx.response.body = tickets;
      return;
    
    case `method=ticketById&id=${id}`:
      ctx.response.body = ticketsFull[id - 1];
      return;
    
    case 'method=createTicket':
      tickets.push(new Ticket(addId(idTicket), 122, false, getDate()));
      ctx.response.body = tickets;
      return;

    default:
      ctx.response.status = 200;
      return;
    }
});

const server = http.createServer(app.callback()).listen(port);
