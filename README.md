## BestOf Bot

### IRC Bot for tracking the best of moments of DTNS

Tracks the best moments of [Daily Tech News Show](http://dailytechnewsshow.com), using the `!b` command.


### Installation

`npm install bestofbot`

### Usage

Messages matching the `!b` command are emitted on the `message` event. Any data included on the command is included in the `message` argument.

```
var BSB = require('bestofbot');

var bsb = new BSB();

bsb.on('message', function(message, user, channel) {
    console.log('message', message);
    console.log('user', user);
    console.log('channel', channel);
});
```

#### Setting your own message filters

Set the filter to use `!s` instead:

```
var BSB = require('bestofbot');
var bsb = new BSB({
    filter: {
        command: '!s'
    }
});
```

Set the command data to only one word. Default is for unlimited word.

```
var BSB = require('bestofbot');
var bsb = new BSB({
    filter: {
        data: '\w'
    }
})
```

#### Setting hosts and channels

Not really designed for this, but you can set the IRC host and channels to listen on.

```
var BSB = require('bestofbot');
var bsb = new BSB({
    host: 'YOUR_HOST_HERE',
    port: 'YOUR_PORT_HERE'
    channels: [
        '#foo',
        '#bar'
    ]
});
```

#### Setting the join message

The bot will. by default, say `I'm a bot` when joining a channel. Set this by passing in a `joinMessage`.

```
var BSB = require('bestofbot');
var bsb = new BSB({
    joinMessage: 'Greetings!'
});
```

### License

(The MIT License)

Copyright &copy; 2014 Alasdair Smith, [http://alasdairsmith.org.uk](http://alasdairsmith.org.uk)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.