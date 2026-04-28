import {
  useAddArticleMutation,
  useUpdateArticleMutation,
} from '../../services/conduit';
import { useState, useActionState, type KeyboardEvent } from 'react';
import { type ConduitError, type Article } from '../../services/types';
import { useNavigate } from 'react-router';

export default function EditorForm({
  isEditMode,
  articleSlug,
  article,
}: {
  isEditMode: boolean;
  articleSlug?: string;
  article?: Article;
}) {
  const [tagList, setTagList] = useState<string[]>(article?.tagList || []);
  const [currentTag, setCurrentTag] = useState('');
  const [addArticle] = useAddArticleMutation();
  const [updateArticle] = useUpdateArticleMutation();
  const navigate = useNavigate();

  const handleAddTag = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (currentTag.trim() && !tagList.includes(currentTag)) {
        setTagList([...tagList, currentTag.trim()]);
        setCurrentTag('');
      }
    }
  };

  const [errMsg, formAction, isPending] = useActionState<
    string | null,
    FormData
  >(async (_, formData) => {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const body = formData.get('body') as string;

    const articlePayload = {
      title: title,
      description: description,
      body: body,
      tagList: tagList,
    };

    try {
      if (isEditMode === true) {
        await updateArticle({
          slug: articleSlug,
          article: articlePayload,
        }).unwrap();
        setTagList([]);
        navigate('/');
        return null;
      }
      await addArticle({ article: articlePayload }).unwrap();
      setTagList([]);
      navigate('/');
      return null;
    } catch (err) {
      const error = err as ConduitError;
      console.log(error);
      return `Something went wrong`;
    }
  }, null);

  return (
    <div className='editor-page'>
      <div className='container page'>
        <div className='row'>
          <div className='col-md-10 offset-md-1 col-xs-12'>
            {errMsg && (
              <ul className='error-messages'>
                <li>{errMsg}</li>
              </ul>
            )}

            <form action={formAction}>
              <fieldset>
                <fieldset className='form-group'>
                  <input
                    type='text'
                    name='title'
                    className='form-control form-control-lg'
                    placeholder='Article Title'
                    defaultValue={article?.title}
                  />
                </fieldset>
                <fieldset className='form-group'>
                  <input
                    type='text'
                    name='description'
                    className='form-control'
                    placeholder="What's this article about?"
                    defaultValue={article?.description}
                  />
                </fieldset>
                <fieldset className='form-group'>
                  <textarea
                    className='form-control'
                    name='body'
                    rows={8}
                    placeholder='Write your article (in markdown)'
                    defaultValue={article?.body}
                  ></textarea>
                </fieldset>
                <fieldset className='form-group'>
                  <input
                    type='text'
                    value={currentTag}
                    className='form-control'
                    placeholder='Write a tag and press "Enter"'
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyDown={handleAddTag}
                  />
                  <div className='tag-list tagList'>
                    {tagList.map((tag) => (
                      <span className='tag-default tag-pill' key={tag}>
                        <i
                          className='ion-close-round'
                          onClick={() =>
                            setTagList(tagList.filter((t) => t !== tag))
                          }
                        ></i>{' '}
                        {tag}
                      </span>
                    ))}
                  </div>
                </fieldset>
                <button
                  className='btn btn-lg pull-xs-right btn-primary'
                  type='submit'
                >
                  {isPending ? 'Publishing' : 'Publish Article'}
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
