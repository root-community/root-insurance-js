quote = {
  async createQuote(args) {
    const data = this.formatQuoteArguments(args)
    console.log(data)
    return this.post('quotes', data)
  },

  formatQuoteArguments(args) {
    switch(args.type) {
      case 'root_gadgets': return this.gadgetsData(args)
      default: return {}
    }
  },

  gadgetsData(args) {
    return {
      type:       'root_gadgets',
      model_name: args.model_name
    }
  }
}

module.exports = quote
