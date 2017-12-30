exports.fork = (combiner, first, second) => param => combiner(first(param), second(param))
