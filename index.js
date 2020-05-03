const abs = Math.abs
const c2f = (c) => 1.8 * c + 32

function trainNeuron(params) {

  var neurona = new Neuron({
    divisor: params.divisor,
    iterations: params.iterations
  })

  var iterations = neurona.train(params.values)

  // console.table(iterations)

  // console.log(neurona.weights())

  return { objective: { a: 1.8, b: 32 }, all: iterations }
}

var exports = exports

if (exports && exports.main === module) {

    var values = []
    for (var i = 0; i < 10; i += 1) {
      values.push({
        input: i,
        expectedOutput: c2f(i)
      })
    }

    trainNeuron({ values })

}

