import express from 'express';
import { printerPort, printer } from './constants.js';
import cors from "cors";
import { loadEnvFile } from 'node:process';

loadEnvFile('./.env');

const app = express();
const port = process.env.SERVER_PORT;

app.use(express.json());
app.use(cors());

app.get('/status', async (req, res) => {
    const isConnected = await printer.isPrinterConnected();
    const printerInfo = printerPort;
    res.json({ printerIsConnected: isConnected, printerInfo: printerInfo.path });
})

app.post('/example', (req, res) => {
    const data = req.body;
    const articlesLines = data.articlesLines;
    //Header
    printer.alignCenter();
    printer.println("Restaurant");
    printer.bold(true);
    printer.println("MY RESTAURANT");
    printer.bold(false);
    printer.println("C/ Some Street 55");
    printer.println("Tel: 91 354 25 96");
    printer.drawLine();

    //Ticket lines
    printer.alignLeft();
    printer.println('Articles lines');
    printer.drawLine();
    printer.table(['Qn', 'name', 'Price', 'Total'])
    for (let i = 0; i < articlesLines.length; i++) {
        const articleLine = articlesLines[i];
        printer.table([articleLine.quantity, articleLine.name.slice(0, 10), articleLine.price, articleLine.total]);
    }
    printer.drawLine();
    //Footer
    printer.alignCenter();
    printer.println("Thanks for your visit");
    printer.newLine();
    printer.newLine();
    printer.newLine();
    console.log(printer.getText());
    res.json({ ticket: printer.getText() });
})

app.post('/print', (req, res) => {
    const data = req.body;
    const articlesLines = data.articlesLines;
    //Header
    printer.alignCenter();
    printer.println("Restaurant");
    printer.bold(true);
    printer.println("MY RESTAURANT");
    printer.bold(false);
    printer.println("C/ Some Street 55");
    printer.println("Tel: 91 354 25 96");
    printer.drawLine();

    //Ticket lines
    printer.alignLeft();
    printer.println('Articles lines');
    printer.drawLine();
    // printer.table(['Qn', 'name', 'Price', 'Total'])
    printer.tableCustom([
        { text: 'Cant', align: 'CENTER', cols: 6 },
        { text: 'Nombre', align: 'CENTER', cols: 23 },
        { text: 'Pre.', align: 'CENTER', cols: 6 },
        { text: 'Total', align: 'CENTER', cols: 7 },
    ]);
    for (let i = 0; i < articlesLines.length; i++) {
        const articleLine = articlesLines[i];
        // printer.table([articleLine.quantity, articleLine.name.slice(0, 10), articleLine.price, articleLine.total]);
        printer.tableCustom([
            { text: articleLine.quantity, align: 'CENTER', cols: 6 },
            { text: articleLine.name, align: 'LEFT', cols: 23 },
            { text: articleLine.price, align: 'CENTER', cols: 6 },
            { text: articleLine.total, align: 'CENTER', cols: 7 },
        ]);
    }
    printer.drawLine();

    //Footer
    printer.alignCenter();
    printer.println("Thanks for your visit");
    printer.newLine();
    printer.newLine();

    try {
        const data = printer.getBuffer();
        printerPort.open((err) => {
            if (err) {
                return res.status(503).json({ error: "Printer unavailable" });
            }
            console.log(`✅ Port ${printerPort.path} open correctly.`);
            printerPort.write(data, (err) => {
                if (err) {
                    return res.status(503).json({ error: "Error trying to print" });
                }
                console.log(`Data send it correctly to port ${printerPort.path}.`);
                printer.clear();
                printerPort.close();
            });
        });
        console.log('Print success.');
    } catch (error) {
        console.error('Print error:', error);
    }
})

app.post('/open-drawer', (req, res) => {
    printer.openCashDrawer();
    try {
        const data = printer.getBuffer();
        printerPort.open((err) => {
            if (!printerPort.isOpen) { return res.status(502).json({ error: "Cash drawer unavailable" }); }
            if (err) {
                return res.status(503).json({ error: "Cash drawer unavailable" });
            }
            console.log(`✅ Port ${printerPort.path} open correctly.`);

            printerPort.write(data, (err) => {
                if (err) {
                    return res.status(503).json({ error: "Error opening the cash drawer" });
                }
                console.log(`Data send it correctly to port ${printerPort.path}.`);
                printer.clear();
                printerPort.close();
            });

        });

        console.log('Cashdrawer open!.');
    } catch (error) {
        console.error('Cashdrawer error:', error);
    }
});

app.listen(port, () => {
    console.log(`Print server listening on http://localhost:${port}`);
})