
exports.lookupPipe = (from, let, pipeOptions, as) => (
  {$lookup: {
    from: from,
    let: let,
    pipeline: pipeOptions,
    as: as
  }}
)
