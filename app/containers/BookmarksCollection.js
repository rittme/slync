import { connect } from 'react-redux'
import { bookmarksUpdated } from '../actions'
import BookmarksPage from 'components/BookmarksPage/BookmarksPage'

const mapStateToProps = (state) => {
  return {
    sites: state.bookmarks,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id))
    }
  }
}

const BookmarksCollection = connect(
  mapStateToProps, null
)(BookmarksPage)

export default BookmarksCollection
