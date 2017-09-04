package cmwell.ws.adt.request

import cmwell.fts._
import org.joda.time.DateTime
import wsutil.{RawFieldFilter, RawMultiFieldFilter, RawSingleFieldFilter, RawSortParam}
import cmwell.util.string.Base64.encodeBase64URLSafeString
import cmwell.util.string.Zip.compress

case class SearchRequestParams(path: String,
                               qpOpt: Option[RawFieldFilter],
                               from: Option[DateTime],
                               to: Option[DateTime],
                               length: Int,
                               offset: Int,
                               rawSortParams: RawSortParam,
                               withDescendants: Boolean,
                               withDeleted: Boolean,
                               pathFilter: Option[PathFilter],
                               withData: Boolean,
                               withHistory: Boolean,
                               debugInfo: Boolean,
                               nbg: Boolean,
                               xg: Boolean,
                               yg: Boolean) {


  private def rffSorter(sff: Seq[RawFieldFilter]): Seq[RawFieldFilter] = {
    sff.map {
      case single: RawSingleFieldFilter => single
      case RawMultiFieldFilter(fo, inners) => RawMultiFieldFilter(fo, rffSorter(inners))
    }.sortBy {
      case single: RawSingleFieldFilter => single.toString
      case _: RawMultiFieldFilter => ""
    }
  }

  def getDigest: String = {
    val modifiedThis = this.copy(withData = false, qpOpt = qpOpt.map {
      case RawMultiFieldFilter(fo, filters) => RawMultiFieldFilter(fo, rffSorter(filters))
      case single => single
    })

    encodeBase64URLSafeString(compress(modifiedThis.toString))
  }
}

