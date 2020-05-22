import fs from 'fs';

// create sw hash
let map = {};

class SWF {
  constructor() {
    this.builtSWL();
  }
  /**
   * create tree node
   * @param {String，sensitive words} word
   * @param {Number, if flag===1, done} flag
   * @param {Object, childs} nodes
   * @return {Object, TNode} node
   */
  createTNode(word, flag, nodes) {
    let node = {};
    node.word = word || '';
    flag < 0 ? (node.flag = 0) : (node.flag = 1);
    node.nodes = nodes || {};
    return node;
  }

  /**
   * add sw in the tree
   * @param {String, sensitive words} sentences
   */
  addWord(sentences) {
    if (!sentences) return;
    const len = sentences.length;
    sentences = sentences.toLowerCase();

    // init rootNode
    const rootNode = sentences.charAt(0);

    // just one word
    if (len === 1) {
      map[rootNode] = this.createTNode(rootNode, 1, {});
      return;
    }

    if (!map[rootNode]) map[rootNode] = this.createTNode(rootNode, 0, {});

    let _map = map[rootNode];

    for (let i = 1; i < len; i++) {
      let _pre = sentences.charAt(i - 1),
        _cur = sentences.charAt(i),
        _node = this.createTNode(_cur, i - len + 1, {});

      _map.nodes[_cur] = _node;
      _map = _map.nodes[_cur];
    }
  }
  builtSWL() {
    const filePath = __dirname + '/sw.txt';
    const dataBuf = fs.readFileSync(filePath);

    // Buffer convert to Array , if linux, please use next line
    // const datas = data.toString().split('\n');
    const datas = dataBuf.toString().split('\r\n');

    datas.forEach((val) => {
      this.addWord(val);
    });
  }

  /**
   * filter and replace it by "*"
   * @param {String, your sentence} sentence
   */
  parse(sentence) {
    if (!sentence) return '';
    const len = sentence.length;
    const m = map;

    // [a-zA-Z] convert to [a-z]
    sentence = sentence.toLowerCase().split('');

    for (let i = 0; i < len; i++) {
      let w = sentence[i];
      if (m[w]) {
        // state transition
        let curState = m[w];
        for (let j = i + 1; j <= len; ) {
          // next word
          let nw = sentence[j];

          //only one word
          if (curState.nodes === {}) {
            sentence[i] = '*';
          }

          if (curState.nodes[nw]) {
            // if it matches a sensitive word
            if (curState.nodes[nw].flag === 1) {
              // replace
              for (i; i <= j; i++) sentence[i] = '*';
              // continue to judge until i equals len
              i = j;
              break;
            } else {
              curState = curState.nodes[nw];
              j++;
            }
          } else {
            break;
          }
        }
      }
    }
    return sentence.join('');
  }
}

export default new SWF();

// example
// let test = new SWF();
// let res = test.parse('');
// console.log(res);
