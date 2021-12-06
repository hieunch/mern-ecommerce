/**
 *
 * NewsPage
 *
 */

 import React from 'react';
 import { connect } from 'react-redux';
 import { Row, Col } from 'reactstrap';
 import { Link } from 'react-router-dom';
 import Slider from "react-slick";
 
 import actions from '../../actions';
 

 import LoadingIndicator from '../../components/Common/LoadingIndicator';
 import NotFound from '../../components/Common/NotFound';
 
 
 class NewsPage extends React.PureComponent {
   componentDidMount() {
    document.title = "Tin Tức";
     const slug = this.props.match.params.slug;
     this.props.fetchNewsListBySlug(slug);
    //  document.body.classList.add('product-page');
   }
 
   componentDidUpdate(prevProps) {
     if (this.props.match.params.slug !== prevProps.match.params.slug) {
       const slug = this.props.match.params.slug;
       this.props.fetchNewsListBySlug(slug);
     }
   }
 
   componentWillUnmount() {
    //  document.body.classList.remove('product-page');
   }
 
   constructor(props) {
     super(props);
   }

   formatDate(timeCreated) {
    var date = new Date(timeCreated);
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var dt = date.getDate();

    if (dt < 10) {
      dt = '0' + dt;
    }
    if (month < 10) {
      month = '0' + month;
    }

    return (dt+'/' + month + '/'+year);
  }
 
   render() {
     const {
       isLoading,
       news,
     } = this.props;
 
     return (
       <div className='news-page'>
         {isLoading ? (
           <LoadingIndicator />
         ) : news && Object.keys(news).length > 0 ? (
          <div className="view ql-editor">
            <h2 className='news-title ql-align-justify'><strong>{news.title}</strong></h2>
            <div dangerouslySetInnerHTML={{ __html: news?.content }}></div>
            <p>{this.formatDate(news.created)}</p>
          </div>
         ) : (
           <NotFound message='Not found.' />
         )}
       </div>
     );
   }
 }
 
 const mapStateToProps = state => {
   return {
     news: state.news.newsDisplayed,
     isLoading: state.news.isLoading,
   };
 };
 
 export default connect(mapStateToProps, actions)(NewsPage);
 