const fetch = require("node-fetch");
const formDate = require("form-data");
const reqUrl = require('url');

function base64ToBufferAsync(base64) {

    return new Promise((resolve, reject) => {

        var dataUrl = "data:application/pdf;base64," + base64;

        fetch(dataUrl)// Cannot get it to work as it doesn't work with Node v2; need to think of another solution
            .then(res => res.blob())
            .then(blob => {
                resolve(blob);
            })

    })
}


//////////////////////////////
// var myyHeaders = new Headers(); // Doesn't work on my machine, replaced with Node v2 acceptable form, see below.
//////////////////////////////

// var myHeaders = new fetch_.Headers();

var myHeaders = new fetch.Headers();


myHeaders.append("Authorization", "Basic YjkzMDRmM2EtZGJkNi00NmM0LTgxNGEtMTliOGE2OTAxMGIyOjlkNGZlYjM1NDc5YjI1ZmM3OGQ2OTBhNmNkOTBhMDU4YWM2NzI3ZTMwZTEwYzQwNGVjODBjODYzNzQ0MmQ1NGRmMmExYWI0NQ==");

let pdfbase64 = "JVBERi0xLjMNCiXi48/TDQoNCjEgMCBvYmoNCjw8DQovVHlwZSAvQ2F0YWxvZw0KL091dGxpbmVzIDIgMCBSDQovUGFnZXMgMyAwIFINCj4+DQplbmRvYmoNCg0KMiAwIG9iag0KPDwNCi9UeXBlIC9PdXRsaW5lcw0KL0NvdW50IDANCj4+DQplbmRvYmoNCg0KMyAwIG9iag0KPDwNCi9UeXBlIC9QYWdlcw0KL0NvdW50IDINCi9LaWRzIFsgNCAwIFIgNiAwIFIgXSANCj4+DQplbmRvYmoNCg0KNCAwIG9iag0KPDwNCi9UeXBlIC9QYWdlDQovUGFyZW50IDMgMCBSDQovUmVzb3VyY2VzIDw8DQovRm9udCA8PA0KL0YxIDkgMCBSIA0KPj4NCi9Qcm9jU2V0IDggMCBSDQo+Pg0KL01lZGlhQm94IFswIDAgNjEyLjAwMDAgNzkyLjAwMDBdDQovQ29udGVudHMgNSAwIFINCj4+DQplbmRvYmoNCg0KNSAwIG9iag0KPDwgL0xlbmd0aCAxMDc0ID4+DQpzdHJlYW0NCjIgSg0KQlQNCjAgMCAwIHJnDQovRjEgMDAyNyBUZg0KNTcuMzc1MCA3MjIuMjgwMCBUZA0KKCBBIFNpbXBsZSBQREYgRmlsZSApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY4OC42MDgwIFRkDQooIFRoaXMgaXMgYSBzbWFsbCBkZW1vbnN0cmF0aW9uIC5wZGYgZmlsZSAtICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNjY0LjcwNDAgVGQNCigganVzdCBmb3IgdXNlIGluIHRoZSBWaXJ0dWFsIE1lY2hhbmljcyB0dXRvcmlhbHMuIE1vcmUgdGV4dC4gQW5kIG1vcmUgKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA2NTIuNzUyMCBUZA0KKCB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDYyOC44NDgwIFRkDQooIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNjE2Ljg5NjAgVGQNCiggdGV4dC4gQW5kIG1vcmUgdGV4dC4gQm9yaW5nLCB6enp6ei4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNjA0Ljk0NDAgVGQNCiggbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDU5Mi45OTIwIFRkDQooIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNTY5LjA4ODAgVGQNCiggQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA1NTcuMTM2MCBUZA0KKCB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBFdmVuIG1vcmUuIENvbnRpbnVlZCBvbiBwYWdlIDIgLi4uKSBUag0KRVQNCmVuZHN0cmVhbQ0KZW5kb2JqDQoNCjYgMCBvYmoNCjw8DQovVHlwZSAvUGFnZQ0KL1BhcmVudCAzIDAgUg0KL1Jlc291cmNlcyA8PA0KL0ZvbnQgPDwNCi9GMSA5IDAgUiANCj4+DQovUHJvY1NldCA4IDAgUg0KPj4NCi9NZWRpYUJveCBbMCAwIDYxMi4wMDAwIDc5Mi4wMDAwXQ0KL0NvbnRlbnRzIDcgMCBSDQo+Pg0KZW5kb2JqDQoNCjcgMCBvYmoNCjw8IC9MZW5ndGggNjc2ID4+DQpzdHJlYW0NCjIgSg0KQlQNCjAgMCAwIHJnDQovRjEgMDAyNyBUZg0KNTcuMzc1MCA3MjIuMjgwMCBUZA0KKCBTaW1wbGUgUERGIEZpbGUgMiApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY4OC42MDgwIFRkDQooIC4uLmNvbnRpbnVlZCBmcm9tIHBhZ2UgMS4gWWV0IG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA2NzYuNjU2MCBUZA0KKCBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY2NC43MDQwIFRkDQooIHRleHQuIE9oLCBob3cgYm9yaW5nIHR5cGluZyB0aGlzIHN0dWZmLiBCdXQgbm90IGFzIGJvcmluZyBhcyB3YXRjaGluZyApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY1Mi43NTIwIFRkDQooIHBhaW50IGRyeS4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA2NDAuODAwMCBUZA0KKCBCb3JpbmcuICBNb3JlLCBhIGxpdHRsZSBtb3JlIHRleHQuIFRoZSBlbmQsIGFuZCBqdXN0IGFzIHdlbGwuICkgVGoNCkVUDQplbmRzdHJlYW0NCmVuZG9iag0KDQo4IDAgb2JqDQpbL1BERiAvVGV4dF0NCmVuZG9iag0KDQo5IDAgb2JqDQo8PA0KL1R5cGUgL0ZvbnQNCi9TdWJ0eXBlIC9UeXBlMQ0KL05hbWUgL0YxDQovQmFzZUZvbnQgL0hlbHZldGljYQ0KL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcNCj4+DQplbmRvYmoNCg0KMTAgMCBvYmoNCjw8DQovQ3JlYXRvciAoUmF2ZSBcKGh0dHA6Ly93d3cubmV2cm9uYS5jb20vcmF2ZVwpKQ0KL1Byb2R1Y2VyIChOZXZyb25hIERlc2lnbnMpDQovQ3JlYXRpb25EYXRlIChEOjIwMDYwMzAxMDcyODI2KQ0KPj4NCmVuZG9iag0KDQp4cmVmDQowIDExDQowMDAwMDAwMDAwIDY1NTM1IGYNCjAwMDAwMDAwMTkgMDAwMDAgbg0KMDAwMDAwMDA5MyAwMDAwMCBuDQowMDAwMDAwMTQ3IDAwMDAwIG4NCjAwMDAwMDAyMjIgMDAwMDAgbg0KMDAwMDAwMDM5MCAwMDAwMCBuDQowMDAwMDAxNTIyIDAwMDAwIG4NCjAwMDAwMDE2OTAgMDAwMDAgbg0KMDAwMDAwMjQyMyAwMDAwMCBuDQowMDAwMDAyNDU2IDAwMDAwIG4NCjAwMDAwMDI1NzQgMDAwMDAgbg0KDQp0cmFpbGVyDQo8PA0KL1NpemUgMTENCi9Sb290IDEgMCBSDQovSW5mbyAxMCAwIFINCj4+DQoNCnN0YXJ0eHJlZg0KMjcxNA0KJSVFT0YNCg==";

base64ToBufferAsync(pdfbase64).then((blob) => {

    var formdata = new FormData();
    formdata.append("attachments", blob, "sample-pdf.pdf");
    formdata.append("file", "{ \"extraDetails\": { \"FAM_REP_NAME\": \"FAM_REP_NAME_TEST\",\"SELLER_COMPANY_NAME\":\"SELLER_COMPANY_NAME_TEST\", \"FAM_BRANCH_CODE\":\"FAM_BRANCH_CODE_TEST\",\"SELLER_LINE_3\": \"fdgfg\", \"SELLER_LINE_2\": \"dfd\", \"SELLER_LINE_1\": \"sdff\", \"SELLER_CITY\": \"sdfsdff\", \"SELLER_POST_CODE\": \"dfgddg\", \"SELLER_EORI_NO\": \"jhj\", \"SELLER_COUNTRY_CODE\": \"AD\", \"BUYER_ACCOUNT_NUMBER\": \"BUYER_ACCOUNT_NUMBER\", \"BUYER_COMPANY_NAME\": \"BUYER_COMPANY_NAME\", \"BUYER_LINE_1\": \"BUYER_LINE_1\", \"BUYER_LINE_2\": \"BUYER_LINE_2\", \"BUYER_LINE_3\": \"BUYER_LINE_3\", \"BUYER_CITY\": \"BUYER_CITY\", \"BUYER_POST_CODE\": \"BUYER_POST_CODE\", \"BUYER_COUNTRY_CODE\": \"BJ\", \"BUYER_EORI_NO\": \"BUYER_EORI_NO\", \"CONSIGNMENT_REFERENCE\": \"CONSIGNMENT_REFERENCE\", \"SHIP_TO_COUNTRY\": \"AE\", \"SHIPPING_TABLE\": [ { \"TOTAL_PACKAGES\": 3, \"PACKING_TYPE\": \"Carton(s)\", \"ITEM_DESCRIPTION\": \"iphone\", \"GROSS_WEIGHT_SHIPMENT\": 35 }, { \"TOTAL_PACKAGES\": 5, \"PACKING_TYPE\": \"Carton(s)\", \"ITEM_DESCRIPTION\": \"5\", \"GROSS_WEIGHT_SHIPMENT\": 5 }, { \"TOTAL_PACKAGES\": 5, \"PACKING_TYPE\": \"Carton(s)\", \"ITEM_DESCRIPTION\": \"5\", \"GROSS_WEIGHT_SHIPMENT\": 5 }, { \"TOTAL_PACKAGES\": 5, \"PACKING_TYPE\": \"Carton(s)\", \"ITEM_DESCRIPTION\": \"5\", \"GROSS_WEIGHT_SHIPMENT\": 555 }, { \"TOTAL_PACKAGES\": 5, \"PACKING_TYPE\": \"Carton(s)\", \"ITEM_DESCRIPTION\": \"5\", \"GROSS_WEIGHT_SHIPMENT\": 555 }, { \"TOTAL_PACKAGES\": 5, \"PACKING_TYPE\": \"Carton(s)\", \"ITEM_DESCRIPTION\": \"5\", \"GROSS_WEIGHT_SHIPMENT\": 511 }, { \"TOTAL_PACKAGES\": 5, \"PACKING_TYPE\": \"Carton(s)\", \"ITEM_DESCRIPTION\": \"5\", \"GROSS_WEIGHT_SHIPMENT\": 7979 } ] } }");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };
    // Environmental path's settings: //////////////////////////////////////////////////////////////////////////


    let getPath = 'https://microservices-gateway.platform.staging2.aidock.net';// Temporary substitution
    // let get_path = window.location.origin; // Supposed to be in final version

    let parseUrl = reqUrl.parse(getPath, true);
    let envProtocol = parseUrl.protocol;
    let envPath = parseUrl.host;

    // Other environmental settings: //////////////////////////////////////////////////////////////////////////

    let pipelineId = '8b6b46de-19d9-4365-936a-da83712aa011'; // The real value is presumed to pass into function as arg
    let customerId = 'f30b2f89-03e3-41c7-97fd-6f3bd6326f27'; // The real value is presumed to pass into function as arg

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    console.log('The path: ' + envProtocol + envPath + "/rest/attachment/newApiFile?pipelineId=" + pipelineId + "&customerId=" + customerId);

    // fetch(envProtocol + envPath +"/rest/attachment/newApiFile?pipelineId="+ pipelineId +"&customerId=" + customerId, requestOptions)
    //     .then(response => response.json())
    //     .then(result => console.log(result))
    //     .catch(error => console.log('error', error));
})// JavaScript source code
