import { terminal } from './terminal.js';

// example of simple shell
const term = new terminal(document.querySelector('terminal'), window.innerHeight/15 - 1, window.innerWidth/10 - 3);

// demo
term.puts("\x1b[1;31mHello\x1b[m \x1b[1;32mWorld\x1b[m \x1b[1;33m!\x1b[0m\n");
term.printf("%s %s %c\n", "Hello", "World", 33);
for (let i = 0; i < 11; i++) {
	for (let j = 0; j < 10; j++) {
		let n = 10 * i + j;
		if (n > 107) break;
		term.puts("\x1b["+n+"m "+n+"\x1b[0m");
	}
	term.puts("\n");
}

var a = document.createElement("a")
a.href = "https://github.com/flamebousteur/terminal"
a.target = "_blank"
a.innerHTML = "https://github.com/flamebousteur/terminal"
a.style.position = "absolute"
a.style.top = "0"
a.style.right = "0"
a.style.width = "100%"
a.style.textAlign = "center"
a.style.backgroundColor = "#0000"
document.body.appendChild(a)