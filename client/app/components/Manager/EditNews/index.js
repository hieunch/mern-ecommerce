/**
 *
 * EditNews
 *
 */

import React, { useRef } from 'react';

import Input from '../../Common/Input';
import Button from '../../Common/Button';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import LoadingIndicator from '../../../components/Common/LoadingIndicator';

const taxableSelect = [
  { value: 1, label: 'Yes' },
  { value: 0, label: 'No' }
];

const EditNews = props => {
  const {
    news,
    editNews,
    formErrors,
    updateNews,
    deleteNews,
    isLoading
  } = props;

  const quillRef = useRef(null);

  const handleSubmit = event => {
    event.preventDefault();
    updateNews();
  };

  const modules = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean'],                                        // remove formatting button
        ['link', 'image']
      ],
    }
  };

  return (
    <div className='edit-news'>
      {isLoading ? (
        <LoadingIndicator inline />
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <Input
            type={'textarea'}
            error={formErrors['title']}
            label={'Tiêu đề'}
            name={'title'}
            placeholder={'Tiêu đề...'}
            value={news.title}
            onInputChange={(name, value) => {
                editNews(name, value);
            }}
          />
          <Input
            type={'text'}
            error={formErrors['keywords']}
            label={'Từ khóa'}
            name={'keywords'}
            placeholder={'Từ khóa...'}
            value={news.keywords}
            onInputChange={(name, value) => {
              editNews(name, value);
            }}
          />
          <div className="input-box">
            <label>Nội dung</label>
            <ReactQuill 
              theme="snow"
              ref={quillRef}
              modules={modules}
              value={news.content}
              onChange={(value)=>{editNews("content", value)}} 
            />
          </div>
          <hr />
          <div className='d-flex flex-column flex-md-row'>
            <Button
              type='submit'
              text='Lưu'
              className='mb-3 mb-md-0 mr-0 mr-md-3'
            />
            <Button
              variant='danger'
              text='Xóa tin'
              onClick={() => deleteNews(news._id)}
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default EditNews;
