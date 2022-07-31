const http = require('http');
const port = 7070;
const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('@koa/cors');
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
ticketsFull.push(new TicketFull(1, 'Поменять краску в принтере', false, getDate(), 'Поменять краску в принтере LaserJet 1320'));
tickets.push(new Ticket(2, 'Переустановить Windows', false, getDate()));
ticketsFull.push(new TicketFull(2, 'Переустановить Windows', false, getDate(), 'Переустановить Windows 10'));
tickets.push(new Ticket(3, 'Установить обновление', true, getDate()));
ticketsFull.push(new TicketFull(3, 'Установить обновление', true, getDate(), 'Установить обновление KB5005565'));

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
      if (Object.keys(ctx.request.body).length !== 0) {
        const index = tickets.findIndex(a => a.id === Number(id));

        tickets[index].name = ctx.request.body.text;
        ticketsFull[index].name = ctx.request.body.text;
        ticketsFull[index].description = ctx.request.body.textarea;
      } 

      ctx.response.body = ticketsFull[ticketsFull.findIndex(a => a.id === id)];
      console.log(ctx.response.body);
      return;
    
    case 'method=createTicket':
      let idTicket = 0;
      let idArr = [];
      tickets.forEach(a => idArr.push(a.id));
      if (idArr.length !== 0) {
        idTicket = Math.max.apply(null, idArr);
      }
      tickets.push(new Ticket(addId(idTicket), ctx.request.body.text, false, getDate()));
      ticketsFull.push(new TicketFull(addId(idTicket), ctx.request.body.text, true, getDate(), ctx.request.body.textarea));
      ctx.response.body = tickets;
      return;

    case 'method=deleteTicket':
      const index = tickets.findIndex(a => a.id === Number(ctx.request.body.id));
      tickets.splice(index, 1);
      ticketsFull.splice(index, 1);
      ctx.response.body = tickets;
      return;

    default:
      ctx.response.status = 404;
      return;
    }

});

const server = http.createServer(app.callback()).listen(port);
