const scrollChunkSize = 50

let { Link } = ReactRouter
let { Infoton } = Domain
let { ActionsBar, ErrorMsg } = CommonComponents

class InfotonsList extends React.Component {
  constructor(props) {
    super(props)
      
    this.loadingSpinnerItem = <li className="infoton-list-item" key="loading">
                                  <img className="bullet" src="/meta/app/react/images/infoton-icon.svg" />
                                  <span className="names">
                                      <span className="display-name loading">Loading more Infotons...</span>
                                  </span>
                              </li>
        
        this.state = { }
        
 /*   this.state = {
        //todo should be: tree: {}
        tree: new InfotonsTree(
   -1,
  "$root",
   [
    new InfotonsTree(
       789,
      "meta",
       [],
       "x",
       false,
        true,
       "EXHAUSTED")
    ,
    new InfotonsTree(
       777,
      "permid.org",
       [
        new InfotonsTree(
           1,
          "1-123456789",
           [],
           "a",
           false,
            true,
           "EXHAUSTED")
        ,
        new InfotonsTree(
           2,
          "2-abc34ba",
           [],
           "a",
           false,
            true,
           "EXHAUSTED")
        
      ],
       "a",
       true,
        true,
       "EXHAUSTED")
    ,
    new InfotonsTree(
       8,
      "example.org",
       [],
       "a",
       false,
        false,
       "LOADING"
    )
  ],
   "a",
   false,
    true,            
   "LOADING"
)
        }*/
    }
    
//  doFetch(path = this.props.location.pathname, qp = this.props.location.query.qp) {
//      qp = qp && qp!='None' ? `&recursive&qp=${qp}` : ''
//      let createConsumerUrl = `${path}?op=create-consumer${qp}`
//      
//      if(_(this.onAirAjax).contains(createConsumerUrl))
//          return
//      
//      if(!this.position) {
//          this.onAirAjax.push(createConsumerUrl)
//          AppUtils.cachedGet(createConsumerUrl).always((resp,rt,jqXhr) => {
//              this.onAirAjax = _(this.onAirAjax).without(createConsumerUrl)
//              if(_(this.cancelledAjaxes).contains(createConsumerUrl)) return
//              if(resp.status !== undefined && resp.status !== 200) {
//                  this.setState({ isInfiniteLoading: false, errMsg: AppUtils.ajaxErrorToString(resp) })
//                  return
//              }
//
//              this.position = this.getHeader(jqXhr, resp, 'position')
//              this.doFetch()
//          })
//          return
//      }
//      
//      // Once we have position, we fire two ajaxes in parallel. First is _consume as TSV, other is _consume as JSONL
//      // The idea is to first show a list of Infotons quickly to show them to user, while in the meantime fetch their displayNames
//      
//      if(this.state.infotons.length === 0 && this.state.initialContent.length === 0) {
//          let tsvLineToSkeletonInfoton = tsv => {
//              let s = tsv.split('\t')
//              return { system: { path: s[0], uuid: s[2] }, fields: {} }
//          }
//          
//          let consumeUrlTsv = `/_consume?position=${this.position}&format=tsv`
//
//          if(!_(this.onAirAjax).contains(consumeUrlTsv)) {
//              this.onAirAjax.push(consumeUrlTsv)
//              AppUtils.cachedGet(consumeUrlTsv)
//                  .always((resp,rt,jqXhr) => {
//                    this.onAirAjax = _(this.onAirAjax).without(consumeUrlTsv)
//                    if(_(this.cancelledAjaxes).contains(consumeUrlTsv)) return
//                    if(!resp) return
//                    let initialContent = resp.trim().split`\n`.map(tsvLineToSkeletonInfoton)
//                    let isEmpty = !initialContent.length
//                    this.setState({
//                        errMsg: null,
//                        isInfiniteLoading: false,
//                        isEmpty,
//                        noData: isEmpty,
//                        total: this.state.total || initialContent.length + +this.getHeader(jqXhr, resp, 'n-left'),                        
//                        initialContent
//                    })
//                  })
//          }
//      }
//      
//      
//      let consumeUrl = `/_consume?position=${this.position}&format=jsonl`
//      
//      if(_(this.onAirAjax).contains(consumeUrl))
//          return      
//      
//      this.onAirAjax.push(consumeUrl)
//      AppUtils.cachedGet(consumeUrl).always((resp,rt,jqXhr) => {
//          this.onAirAjax = _(this.onAirAjax).without(consumeUrl)
//          if(_(this.cancelledAjaxes).contains(consumeUrl)) return
//          
//          if(resp && resp.status !== undefined && (resp.status !== 200 && resp.status !== 206)) {
//              this.setState({ isInfiniteLoading: false, errMsg: AppUtils.ajaxErrorToString(resp) })
//              return
//          }
//          
//          let jsonls = (jqXhr && jqXhr.status === 204) ? '' : (jqXhr ? jqXhr.responseText : resp.responseText).split`\n`
//          let newChunk = _(jsonls).compact().map(jsonl => JSON.fromJSONL(JSON.parse(jsonl)))
//
//          let isEmpty = newChunk.length + this.state.infotons.length + this.state.initialContent.length === 0
//          this.props.hasChildrenCb && this.props.hasChildrenCb(!isEmpty)
//
//          this.position = this.getHeader(jqXhr, resp, 'position')
//          
//          this.setState({
//              errMsg: null,
//              isInfiniteLoading: false,
//              isEmpty,
//              noData: isEmpty,
//              total: this.state.total || newChunk.length + +this.getHeader(jqXhr, resp, 'n-left'),
//              infotons: this.state.infotons.concat(newChunk)
//          })
//      })
//  }    

  
    
    
    
    
    getHeader(jqXhr,resp, header) {
      return jqXhr ? jqXhr.getResponseHeader(`x-cm-well-${header}`) : resp.getResponseHeader(`x-cm-well-${header}`)
  }
    
  handleInfiniteLoad() {
      this.setState({ isInfiniteLoading: true })
      this.fetchNow()
  }

  componentDidMount() {
      this.resetStateAndDoFetch(this.props)
  }
    
  componentWillReceiveProps(newProps) {
      this.resetStateAndDoFetch(this.props)
  
    if(AppUtils.isSameLocation(this.props.location, newProps.location))
      return // no need to reload current page

    this.resetStateAndDoFetch(this.props)
  }
    
  resetStateAndDoFetch(props) {
    let root = new InfotonsTree(props.location.pathname)
    root.expanded = true
    this.setState({
        tree: root, 
        qp: props.location.query.qp || 'None'
    })
    this.fetchNow()
  }
  
    
    
    fetchNow() {
        if(!this.state.tree)
            return
            
        this.flatten(this.state.tree)
                .filter(n => n.expanded && (n.state === States.NONE || n.state === States.LOADED))
                .forEach(this.consumeSingle)
    }
    
    consumeSingle(node) {

        let promise = $.Deferred()
        
                                                               
        if(node.position)
            this.consume(node).then(promise.resolve)
        else this.createConsumer(node.path).then(posObj => { // TODO qp ...? on which case???
                if(posObj.error) {
                    // TODO Display error locally?
                    promise.reject(posObj.error)
                } else {
                    node.position = posObj.position
                    this.consume(node.position).then(promise.resolve)
                }
            })
        
        promise.then(chunkObj => {
            if(chunkObj.error) {
                // todo display error locally?
            } else {
                let newChildren = chunkObj.chunk.map(jsonl => new InfotonsTree(jsonl.path, jsonl.fields))
                
                node.position = chunkObj.nextPosition
                node.children = (node.children || []).concat(newChildren)
                
                // we just modified this.state.tree[x].children, but this.state.tree wasn't changed, so we forceUpdate rather than setState:
                this.forceUpdate()
            }
        })   
    }
        
  
    
    createConsumer(path, qp) {
      qp = qp === 'None' ? '' : `&qp=${qp}`
      let createConsumerUrl = `${path}?op=create-consumer${qp}`
      return AppUtils.cachedGet(createConsumerUrl).always((resp,rt,jqXhr) => {
          if(resp.status !== undefined && resp.status !== 200) {
              return { error: AppUtils.ajaxErrorToString(resp) }
          }
          return { position: this.getHeader(jqXhr, resp, 'position') }
      })
  }
    
  consume(position, withData = true) {
      let format = withData ? 'jsonl' : 'tsv'
      let consumeUrl = `/_consume?position=${position}&format=${format}`
      return AppUtils.cachedGet(consumeUrl).always((resp,rt,jqXhr) => {
          if(resp.status !== undefined && resp.status !== 200) {
              return { error: AppUtils.ajaxErrorToString(resp) }
          }
          
          let nextPosition = this.getHeader(jqXhr, resp, 'position')

          var chunk
          if(withData) {
              let jsonls = (jqXhr && jqXhr.status === 204) ? '' : (jqXhr ? jqXhr.responseText : resp.responseText).split`\n`
              chunk = _(jsonls).compact().map(jsonl => JSON.fromJSONL(JSON.parse(jsonl)))
          } else {
              chunk = resp.trim().split`\n`.map(tsvLine => {
                  let s = tsvLine.split('\t')
                  return { system: { path: s[0], uuid: s[2] }, fields: { } } // "SkeletonInfoton"
              })
          }
          
          return { chunk, nextPosition }
      })
  }    
    
    
    
    
    
    
    
    
    
    
  render() {
    AppUtils.debug('InfotonsList.render')
      
    let containerClassName = 'infotons-list-container' + (this.props.infotonIsEmpty ? '' : ' autoWidth')
    let className = 'infotons-list'
    let containerHeight = window.innerHeight-AppUtils.heightOverhead+58

    // todo once we will figure out how Infoton and InfotonsLists can live in peace side by side, perhaps that ugly guard won't be neccassery
    let title = this.props.location.pathname !== '/' && this.state.total && this.props.isRoot ? <div className="infotons-list-title">
            <img src="/meta/app/react/images/folder-box.svg"/>{AppUtils.lastPartOfUrl(this.props.location.pathname)} ({this.state.total.toLocaleString()} result{this.state.total==1?'':'s'})
          </div> : null
    
    let emptyDiv = <div className={containerClassName + ' empty'}></div>

    let errMsg = this.state.errMsg ? <ErrorMsg>{this.state.errMsg}</ErrorMsg> : null
    
    // todo locally in subtree ?
    if(errMsg)
        return errMsg
    
      
   if(!this.state.tree)
       return emptyDiv
      
      
    let flattenTree = this.dropNonExpandedAfterExpanded(this.flatten(this.state.tree))
    let infotons = flattenTree.filter(n => !n.isHidden).map(i => new Infoton({system:{uuid:i,path:i,type:'ObjectInfoton'}}))
//    let infotons = flattenTreeToDisplay.map(i => new Infoton(i, this.props.displayNames))
      
    
    // { this.state.noData ? <div className="no-children">no infotons under this path</div> : null }
    
    return (
        <div className={containerClassName}>
          {title}
          <Infinite className={className}
                         elementHeight={43}
                         containerHeight={containerHeight}
                         infiniteLoadBeginEdgeOffset={10}
                         onInfiniteLoad={this.handleInfiniteLoad.bind(this)}
                         loadingSpinnerDelegate={this.loadingSpinnerItem}
                         isInfiniteLoading={this.state.isInfiniteLoading}
                         >
            { infotons.map(i => <InfotonListItem key={i.uuid||i.path} infoton={i} />) }
            </Infinite>
        </div>
    )
  }

  flatten(tree, props) { 
      let item = props ? _(tree).pick(props) : tree
      return _([item, ...tree.children.map(c => this.flatten(c,props))]).chain().flatten().compact().value()
  }
  
  dropNonExpandedAfterExpanded(flattenTree) {
      var seen = false
      return flattenTree.filter(item => {
          if(item.expanded)
              seen = true
          return !seen || item.expanded || item.displayed
      })
  }
}

class InfotonListItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = { }
    }
    
    onChildrenBulletClick() {
        this.toggleState('expanded')
        this.props.toggleCollapseCb && this.props.toggleCollapseCb()
    }
    
    render() {
        AppUtils.debug('InfotonListItem.render')

        let { path, name, displayName, type, uuid } = this.props.infoton
        let classname = `infoton-list-item ${type}`

        let locationObj = { pathname: path, query: { } } // this is a temp hack. the InfotonList component should accept both location objects and simple paths as well
        let children = this.state.expanded ? <InfotonsList location={locationObj} /> : null
        let childrenBulletClassName = `triangle${this.state.expanded?' down':''}`
        let hasData = !_.isEmpty(this.props.infoton.fields)
        let bulletSrc = `/meta/app/react/images/${type === 'FileInfoton' ? 'file-icon.svg' : 'infoton-icon.svg'}`
        let linkClassName = hasData || type === 'FileInfoton' ? 'display-name' : 'display-name empty-data'

        // ReactRouter uses localStorage to transfer state between routes. let's not explode it...
        let isTooLargeFileInfoton = this.props.infoton.system['length.content'] > AppUtils.constants.fileInfotonInMemoryThreshold
        let stateByRoute = isTooLargeFileInfoton || !hasData ? undefined : this.props.infoton

        return (
            <li className={classname} key={uuid||path}>
                <img className="bullet" src={bulletSrc} />
                <span className="names">
                    <Link to={path.replace('#','%23')} className={linkClassName} state={stateByRoute}>{displayName}</Link>
                    { displayName != name ? <span className="name">{name}</span> : null }
                </span>
                <span className={childrenBulletClassName} onClick={this.onChildrenBulletClick.bind(this)}><img src="/meta/app/react/images/gt-blue.svg"/></span>
                <br/>
                {children}
            </li>
        )
    }
}

const States = { NONE: 'NONE', LOADING: 'LOADING', LOADED: 'LOADED', EXHAUSTED: 'EXHAUSTED' }

class InfotonsTree {
    constructor(path, data, children, position) { //todo should not get last three in CTOR !. Also: displayed should not be here at all, it should be encapsulated in item
        this.path = path
        this.data = data
        this.children = children || []
        this.position = position
        
        this.expanded = false
        this.state = States.NONE
    }
    
    isEmpty() { return this.state === States.EXHAUSTED && this.children.length === 0 }
}



define([], () => InfotonsList)


